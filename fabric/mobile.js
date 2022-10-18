var canvas = new fabric.Canvas("d");
canvas.setHeight(600);
canvas.setWidth(600);

// var imgElement = document.getElementById('my-image');
// var imgInstance = new fabric.Image(imgElement, {
//     left: 100,
//     top: 100,
//     angle: 30,
//     opacity: 0.85
// });
// canvas.add(imgInstance);

var boss = new fabric.Rect({
    width: 150,
    height: 200,
    fill: "red",
    hasControls: false,
    centeredRotation: true,
});
var minion1 = new fabric.Rect({ width: 40, height: 40, fill: "green" });
var minion2 = new fabric.Rect({ width: 40, height: 40, fill: "blue" });

minion1.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
    tr: false,
    tl: false,
    br: false,
    bl: false,
});
minion1.hasRotatingPoint = true;

canvas.add(boss, minion1, minion2);

// zoom 관련
const canvasPos = {
    w: canvas.getWidth(),
    h: canvas.getHeight(),
    mx: canvas.getWidth() / 2,
    my: canvas.getHeight() / 2,
};
const plus = document.getElementById("plus");
const origin = document.getElementById("origin");
const minus = document.getElementById("minus");
var zoom = canvas.getZoom();

origin.addEventListener("click", function () {
    zoom = 1;
    canvas.zoomToPoint({ x: 300, y: 300 }, zoom);
    console.log(zoom);
});

minus.addEventListener("click", function (e) {
    zoom -= 0.1;
    canvas.zoomToPoint({ x: canvasPos.mx, y: canvasPos.my }, zoom);
    console.log(zoom);
});

plus.addEventListener("click", function (e) {
    zoom += 0.1;
    canvas.zoomToPoint({ x: canvasPos.mx, y: canvasPos.my }, zoom);
    console.log(zoom);
});

// bind 관련
boss.on("moving", updateMinions);

var multiply = fabric.util.multiplyTransformMatrices;
var invert = fabric.util.invertTransform;

function updateMinions() {
    boss.sendToBack();
    boss.set("opacity", "0.5");
    canvas.moveTo(boss, -999);

    var minions = canvas.getObjects().filter((o) => o !== boss);
    minions.forEach((o) => {
        if (!o.relationship) {
            return;
        }
        var relationship = o.relationship;
        var newTransform = multiply(boss.calcTransformMatrix(), relationship);
        opt = fabric.util.qrDecompose(newTransform);
        o.set({
            flipX: false,
            flipY: false,
            opacity: 0.5,
        });
        o.setPositionByOrigin(
            { x: opt.translateX, y: opt.translateY },
            "center",
            "center"
        );
        o.set(opt);
        o.setCoords();
    });
}

canvas.on("mouse:out", function (opt) {
    boss.set("opacity", "1");
    minion1.set("opacity", "1");
    minion2.set("opacity", "1");
    boss.sendToBack();
});

canvas.on("mouse:down", function (opt) {
    if (opt.target && opt.target == boss) {
        binding();
    }
});
canvas.on("mouse:up", function (opt) {
    console.log(opt.target);
    if (opt.target && opt.target == boss) {
        boss.sendToBack();
        canvas.moveTo(boss, -999);
    }
});

const binding = function () {
    var minions = canvas.getObjects().filter((o) => o !== boss);
    var bossTransform = boss.calcTransformMatrix();
    var invertedBossTransform = invert(bossTransform);
    minions.forEach((o) => {
        var desiredTransform = multiply(
            invertedBossTransform,
            o.calcTransformMatrix()
        );
        // save the desired relation here.
        o.relationship = desiredTransform;
    });
};

// console.log('boss');
// opt.target.ownCaching = false;
// console.log(canvas.getObjects().indexOf(minion1),canvas.getObjects().indexOf(boss));
// const bindBtn = document.getElementById('bind');
// bindBtn.addEventListener('click',binding);
// .onclick = binding;
