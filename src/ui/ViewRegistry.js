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
/*global console */

;
/**
 * A ViewRegistry maintains the definitions for different kinds of views
 * that may occur in different places in the user interface.
 * @interface ViewRegistry
 * @memberof module:openmct
 */
function ViewRegistry() {
    this.providers = {};
}


/**
 * @private for platform-internal use
 * @param {*} item the object to be viewed
 * @returns {module:openmct.ViewProvider[]} any providers
 *          which can provide views of this object
 */
ViewRegistry.prototype.get = function (item) {
    return this.getAllProviders()
        .filter(function (provider) {
            return provider.canView(item);
        });
};

/**
 * @private
 */
ViewRegistry.prototype.getAllProviders = function () {
    return Object.values(this.providers);
};

/**
 * Register a new type of view.
 *
 * @param {module:openmct.ViewProvider} provider the provider for this view
 * @method addProvider
 * @memberof module:openmct.ViewRegistry#
 */
ViewRegistry.prototype.addProvider = function (provider) {
    var key = provider.key;
    if (key === undefined) {
        throw "View providers must have a unique 'key' property defined";
    }
    if (this.providers[key] !== undefined) {
        console.warn("Provider already defined for key '%s'. Provider keys must be unique.", key);
    }

    this.providers[key] = provider;
};

/**
 * @private
 */
ViewRegistry.prototype.getByProviderKey = function (key) {
    return this.providers[key];
};

/**
 * Used internally to support seamless usage of new views with old
 * views.
 * @private
 */
ViewRegistry.prototype.getByVPID = function (vpid) {
    return this.providers.filter(function (p) {
        return p.vpid === vpid;
    })[0];
};

var bindingVariable = ViewRegistry;
export default bindingVariable;
