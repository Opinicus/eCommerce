import { get as getRequest } from "requester";
import "handlebars";

export function loadTemplate(templateName, dataUrl, selector) {
    var template;
    getRequest(`/templates/${templateName}.handlebars`)
        .then(value => {
            template = value;
            var compiledTemplate = Handlebars.compile(template);
            var data;
            getRequest(dataUrl)
                .then(value => {
                    data = value;
                    var $element = $(selector);
                    $element.html(compiledTemplate(data));
                });
        });
    //console.log(`template is ${template}`)
    // var compiledTemplate = Handlebars.compile(template);
    // var data;
    // getRequest(dataUrl)
    //     .then(value => {
    //         data = value;
    //     });
    // var $element = $(selector);
    // $element.html(compiledTemplate(data));
}