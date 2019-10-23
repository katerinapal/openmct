/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2017, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

;

function TelemetryAverager(telemetryAPI, timeAPI, domainObject, samples, averageDatumCallback) {
    this.telemetryAPI = telemetryAPI;
    this.timeAPI = timeAPI;

    this.domainObject = domainObject;
    this.samples = samples;
    this.averagingWindow = [];

    this.rangeKey = undefined;
    this.rangeFormatter = undefined;
    this.setRangeKeyAndFormatter();

    // Defined dynamically based on current time system
    this.domainKey = undefined;
    this.domainFormatter = undefined;

    this.averageDatumCallback = averageDatumCallback;
}

TelemetryAverager.prototype.createAverageDatum = function (telemetryDatum) {
    this.setDomainKeyAndFormatter();

    var timeValue = this.domainFormatter.parse(telemetryDatum);
    var rangeValue = this.rangeFormatter.parse(telemetryDatum);

    this.averagingWindow.push(rangeValue);

    if (this.averagingWindow.length < this.samples) {
        // We do not have enough data to produce an average
        return;
    } else if (this.averagingWindow.length > this.samples) {
        //Do not let averaging window grow beyond defined sample size
        this.averagingWindow.shift();
    }

    var averageValue = this.calculateMean();

    var meanDatum = {};
    meanDatum[this.domainKey] = timeValue;
    meanDatum.value = averageValue;

    this.averageDatumCallback(meanDatum);
};

/**
 * @private
 */
TelemetryAverager.prototype.calculateMean = function () {
    var sum = 0;
    var i = 0;

    for (; i < this.averagingWindow.length; i++) {
        sum += this.averagingWindow[i];
    }

    return sum / this.averagingWindow.length;
};

/**
 * The mean telemetry filter produces domain values in whatever time
 * system is currently selected from the conductor. Because this can
 * change dynamically, the averager needs to be updated regularly with
 * the current domain.
 * @private
 */
TelemetryAverager.prototype.setDomainKeyAndFormatter = function () {
    var domainKey = this.timeAPI.timeSystem().key;
    if (domainKey !== this.domainKey) {
        this.domainKey = domainKey;
        this.domainFormatter = this.getFormatter(domainKey);
    }
};

/**
 * @private
 */
TelemetryAverager.prototype.setRangeKeyAndFormatter = function () {
    var metadatas = this.telemetryAPI.getMetadata(this.domainObject);
    var rangeValues = metadatas.valuesForHints(['range']);

    this.rangeKey = rangeValues[0].key;
    this.rangeFormatter = this.getFormatter(this.rangeKey);
};

/**
 * @private
 */
TelemetryAverager.prototype.getFormatter = function (key) {
    var objectMetadata = this.telemetryAPI.getMetadata(this.domainObject);
    var valueMetadata = objectMetadata.value(key);

    return this.telemetryAPI.getValueFormatter(valueMetadata);
};

var bindingVariable = TelemetryAverager;
export default bindingVariable;
