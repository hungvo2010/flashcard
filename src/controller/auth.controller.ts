import { Body, Controller, Get, Post, Render, Res } from "@nestjs/common";
import { Response } from "express";
import { PostSigninDto, PostSignupDto } from "src/dto/post-auth.dto";
import { AuthService } from "src/service/auth.service";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Get('/signin')
    @Render('index')
    doGetSignin(@Res() res: Response) {
        // res.
    }

    @Post('/signin')
    doPostSignin(@Body() postSigninBody: PostSigninDto) {
        const { username, password }: { username: String, password: String } = postSigninBody;

    }

    @Get('/signin')
    @Render('index')
    doGetSignup(@Res() res: Response) {
        // res.
    }

    @Post('/signup')
    @Render('/index')
    doPostSignup(@Body() postSignupBody: PostSignupDto) {
        const email: String = postSignupBody.email;
        const fullname: String = postSignupBody.fullname;
        const password: String = postSignupBody.password;

        
    }




}