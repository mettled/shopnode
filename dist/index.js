"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '/.env' });
// import helmet from 'helmet';
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var compression_1 = __importDefault(require("compression"));
var csurf_1 = __importDefault(require("csurf"));
var connect_flash_1 = __importDefault(require("connect-flash"));
var db_1 = __importDefault(require("./core/db"));
var variables_1 = __importDefault(require("./middlewares/variables"));
var home_1 = __importDefault(require("./routes/home"));
var course_1 = __importDefault(require("./routes/course"));
var courses_1 = __importDefault(require("./routes/courses"));
var cart_1 = __importDefault(require("./routes/cart"));
var orders_1 = __importDefault(require("./routes/orders"));
var auth_1 = __importDefault(require("./routes/auth"));
var profile_1 = __importDefault(require("./routes/profile"));
var multer_1 = __importDefault(require("./middlewares/multer"));
var user_1 = __importDefault(require("./middlewares/user"));
var error404_1 = __importDefault(require("./middlewares/error404"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
// сделать закрытым пароль
//
app.set('views', './src/views');
app.set('view engine', 'pug');
var sessionDBConnection = (0, db_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, express_session_1.default)({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        clientPromise: sessionDBConnection,
        dbName: 'shop',
    }),
}));
app.use(multer_1.default.single('avatar'));
app.use((0, csurf_1.default)());
app.use((0, connect_flash_1.default)());
// app.use(helmet());
app.use((0, compression_1.default)());
app.use(user_1.default);
app.use(variables_1.default);
app.use('/', home_1.default);
app.use('/course', course_1.default);
app.use('/courses', courses_1.default);
app.use('/cart', cart_1.default);
app.use('/orders', orders_1.default);
app.use('/auth', auth_1.default);
app.use('/profile', profile_1.default);
app.use(error404_1.default);
app.listen(process.env.PORT, function () {
    console.log('SERVER RUNNING!!!', process.env.PORT);
});
