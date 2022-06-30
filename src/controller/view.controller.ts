import { Controller, Get } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Controller('') 
export class ViewController {
    @Get('')
    redirect(req: Request, res: Response) {
        let check = true;
        if (!req.cookies.jwt) {
            res.redirect('/signin');
        }
        else {
            res.redirect('/home');
        }
    }

    @Get('home')
    getHome(req: Request, res: Response) {
        let account = req["user"];
        if (account) {
            res.locals.account = account;
            fetch(`http://localhost:3000/cards`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({userID: account.id})
            }).then(resp=> resp.json())
            .then(ans => {
                if (ans.result === "success") {
                    res.render('src/views/index', {
                        cards: ans.cards
                    });
                }

            })
        }
    }

    @Get('about')
    getUser(req: Request, res: Response) {
        
    }
}