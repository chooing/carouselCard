var canvas = new fabric.Canvas("c");
canvas.setHeight(600);
canvas.setWidth(600);

canvas.on("mouse:wheel", function (opt) {
    opt.e.preventDefault();
    opt.e.stopPropagation();
    console.log(opt.e.ctrlKey);
    if (opt.e.ctrlKey) {
        console.log("pinch");
        var delta = opt.e.deltaY;
        var zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        canvas.setZoom(zoom);
    } else {
        var e = opt.e;
        var vpt = this.viewportTransform;
        vpt[4] += e.deltaX;
        vpt[5] += e.deltaY;
        this.requestRenderAll();
    }
});

// create a text+circle group
var text = new fabric.Text("Pinch zoom or 2 finger pan", {
    left: 30,
    top: 50,
    fontSize: 20,
});
var circle = new fabric.Circle({
    radius: 100,
    fill: "#eef",
    scaleY: 0.5,
    left: 10,
    top: 20,
});
var group = new fabric.Group([circle, text]);
canvas.add(group);
