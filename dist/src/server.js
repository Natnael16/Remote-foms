"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = __importDefault(require("./config/configs"));
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect(configs_1.default.DB_URI)
    .then(() => {
    console.log('Connected to mongodb...');
    app_1.default.listen(configs_1.default.PORT, () => {
        return console.log(`Express is listening at http://localhost:${configs_1.default.PORT}`);
    });
})
    .catch((err) => console.log('Error occurred while connecting', err));
//# sourceMappingURL=server.js.map