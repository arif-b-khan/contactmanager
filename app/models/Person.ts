import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
    description: "Person model",
    name: "Person"
})
export default class Person{

    constructor(name:string, age:number){
        this.name = name;
        this.age = age;
    }

    @ApiModelProperty({
        description : "Name of a person" ,
        required : true,
        example: ['John']
    })
    public name: string;

    @ApiModelProperty({
        description : "Age of a person" ,
        required : true,
        example: ['38']
    })
    public age: number;
}