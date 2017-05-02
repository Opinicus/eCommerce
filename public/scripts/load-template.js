import { get as getRequest } from "requester";
import "handlebars";

export function loadTemplate(templateName, dataUrl, selector) {
    var template;
    var data;
    var compiledTemplate;
    var $element;
    getRequest(`/templates/${templateName}.handlebars`)
        .then(value => {
            template = value;
            compiledTemplate = Handlebars.compile(template);

            return getRequest(dataUrl);
        })
        .then(value => {
            data = value;
            $element = $(selector);
            $element.html(compiledTemplate(data));
        });
}

export function loadTemplateFromData(templateName, data, selector) {
    var template;
    var compiledTemplate;
    var $element;
    getRequest(`/templates/${templateName}.handlebars`)
        .then(value => {
            template = value;
            compiledTemplate = Handlebars.compile(template);

            $element = $(selector);
            $element.html(compiledTemplate(data));
        });
}