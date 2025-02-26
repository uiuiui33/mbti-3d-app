const mbtiColors = {
    "INTJ": 0x0077ff, "ENTP": 0xff7700, "INFJ": 0x00ff77, "ESFP": 0xffff00
};

document.getElementById("mbtiSelect").addEventListener("change", function() {
    tetrahedron.material.color.setHex(mbtiColors[this.value]);
});
