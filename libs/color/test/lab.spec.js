"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lab_2 = require("../src/lab");
var rgb_1 = require("../src/rgb");
var test_helper_1 = require("./test-helper");
describe('test color lab', function () {
    it('should lab can instant', function () {
        var lab_1 = new lab_2.Lab(0, 0, 0);
        test_helper_1.expectEqualRgb(lab_1.rgb(), new rgb_1.Rgb(0, 0, 0));
    });
    it('should lab represent right rgb color', function () {
        var lab_1 = new lab_2.Lab(1, 2, 3);
        test_helper_1.expectEqualRgb(lab_1.rgb(), new rgb_1.Rgb(0x0c, 0x02, 0x00)); //d65
    });
    it('create lab can receive lab', function () {
        var lab_1 = new lab_2.Lab(1, 2, 3);
        var n_lab = lab_2.Lab.create(lab_1);
        test_helper_1.expectEqualRgb(n_lab.rgb(), new rgb_1.Rgb(0x0c, 0x02, 0x00));
    });
});
//# sourceMappingURL=lab.spec.js.map