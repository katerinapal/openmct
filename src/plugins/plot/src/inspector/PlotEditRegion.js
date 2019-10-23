import Region from ".\\Region.js";
/*global define*/
;

var PlotEditRegion = new Region({
    name: "plot-options",
    title: "Plot Options",
    modes: ['edit'],
    content: {
        key: "plot-options-edit"
    }
});

export default PlotEditRegion;
