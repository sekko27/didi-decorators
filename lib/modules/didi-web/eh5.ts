import { Reflect } from "https://deno.land/x/reflect_metadata@v0.1.12-2/mod.ts";

import { WebDecorators } from "./decorators/WebDecorators.ts";

const { Controller, Get, Post, Body } = WebDecorators;


class Project {
    id: string = "a";
    name: string = "b";
    lala() {

    }
}

Reflect.metadata("design:type", Object)(Project.prototype, "lala");
@Controller("/projects")
class ProjectController {
    @Get()
    list() {
    }

    @Post()
    create(@Body() project: Project): Project {
        return project;
    }
}

console.log(WebDecorators.controllerMetadata(ProjectController));
