
import Person from "../../app/models/Person";
import { Request, Response } from "express";
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";


// export const index = (req: Request, res: Response) => {
//     res.status(200).send({message:"Welcome to contact manager"});
// };

@ApiPath({
    path: "/",
    name: "Home",
    security: { basicAuth: [] }
})
export default class HomeController {
    constructor() {
        console.log("Initializing home controller");
    }

    @ApiOperationGet({
        description: "Get versions objects list",
        summary: "Get versions list",
        responses: {
            200: { description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "Version" }
        },
        security: {
            apiKeyHeader: []
        }
    })
    public index(req: Request, res: Response): void {
        let model = new Person("arif", 36);
        res.status(200).send(model);
    }
}

