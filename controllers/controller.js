"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("=== test1 started ===");
    const body = req.body;
    const params = req.params;
    const query = req.query;
    try {
        console.log("test1 body", body);
        console.log("test1 params", params);
        console.log("test1 query", query);
        res.send("test1 success");
    }
    catch (error) {
        console.error('test1 failed:', error);
        res.status(404).send('test1 failed');
    }
    console.log("--- test1 done ---");
});
module.exports = {
    test1
};
