import { Body, Controller, Get, HttpException, HttpStatus, Post, Redirect, Render, Req, Res } from "@nestjs/common";
import { Response, Request } from "express";
import { RCode } from "src/constant/RCode";
import { PostSigninDto, PostSignupDto } from "src/dto/post-auth.dto";
import { AuthService } from "src/service/auth.service";
import { Config } from "src/constant/Config";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get('/signin')
    // @Render('signin')
    doGetSignin(@Res() res: Response) { 
        return res.render('signin', {
            error: false,
        });
    }

    @Post('/signin')
    @Redirect('/')
    async doPostSignin(@Body() postSigninBody: PostSigninDto, @Req() req: Request, @Res() res: Response) {
        const { email, password }: { email: string, password: string } = postSigninBody;
        const signinRes: number = await this.authService.signin(email, password);
        // console.log(signinRes);
        
        if (signinRes == RCode.FAIL) {
            throw new HttpException("Signin failed", HttpStatus.UNAUTHORIZED);
        }
        const jwtToken: string = await this.authService.genJwtToken({
            email,
        });
        const cookieMaxAge: number = Config.JWT_COOKIE_MAX_AGE;
        res.setHeader("Authorization", "Bearer " + jwtToken);
        res.cookie("jwt", jwtToken, {
            maxAge: cookieMaxAge,
            httpOnly: true,
            secure: req.secure || req.header('x-forwarded-proto') == 'https'
        });
    }

    @Get('/signup')
    // @Render('signup')
    doGetSignup(@Res() res: Response) {
        res.render('signup', {
            error: false,
        })
    }

    @Post('/signup')
    // @Redirect('/signin')
    async doPostSignup(@Body() postSignupBody: PostSignupDto, @Res() res: Response) {
        const { email, fullname, password }: { email: string, fullname: string, password: string } = postSignupBody;
        const signupRes: number = await this.authService.signup(email, fullname, password);
        if (signupRes == RCode.FAIL) {
            // throw new HttpException("Signup failed", HttpStatus.NOT_ACCEPTABLE);
            return res.render('signup', {
                error: true
            })
        }
        res.redirect('/signin');
    }
}