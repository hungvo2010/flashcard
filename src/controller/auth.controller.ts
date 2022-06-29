import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Redirect, Render, Res } from "@nestjs/common";
import { Response } from "express";
import { RCode } from "src/constant/RCode";
import { PostSigninDto, PostSignupDto } from "src/dto/post-auth.dto";
import { AuthService } from "src/service/auth.service";
import { sign, verify } from "jsonwebtoken";
import { Config } from "src/constant/Config";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }

    @Get('/signin')
    @Render('signin')
    doGetSignin(@Res() res: Response) { }

    @Post('/signin')
    @Redirect('/')
    async doPostSignin(@Body() postSigninBody: PostSigninDto, @Res() res: Response) {
        const { email, password }: { email: string, password: string } = postSigninBody;
        const signinRes: number = await this.authService.sigin(email, password);
        if (signinRes == RCode.FAIL) {
            throw new HttpException("Signin failed", HttpStatus.UNAUTHORIZED);
        }
        const jwtToken = sign(email, process.env.JWT_SECRET_DEV, {
            expiresIn: Config.JWT_EXPIRE_IN,
        })
        res.setHeader("Authorization", "Bearer " + jwtToken);
        res.cookie("jwt", jwtToken, {
            maxAge: 7200000,
            httpOnly: true,
        });
    }

    @Get('/signup')
    @Render('signup')
    doGetSignup(@Res() res: Response) { }

    @Post('/signup')
    @Redirect('/signin')
    async doPostSignup(@Body() postSignupBody: PostSignupDto) {
        const { email, fullname, password }: { email: string, fullname: string, password: string } = postSignupBody;
        const signupRes: number = await this.authService.signup(email, fullname, password);
        if (signupRes == RCode.FAIL) {
            throw new HttpException("Signup failed", HttpStatus.NOT_ACCEPTABLE);
        }
    }
}