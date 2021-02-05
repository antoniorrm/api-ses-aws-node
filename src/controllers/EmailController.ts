import { Request, Response } from "express";

import { AWS_SES } from "../server";

export default {
  async sendEmailAws(request: Request, response: Response) {
    const { from, to, body } = request.body;
    let params = {
      Source: from,
      Destination: {
        ToAddresses: to,
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: body,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `Hello, ${to}!`,
        },
      },
    };
    AWS_SES.sendEmail(params)
      .promise()
      .then(() => {
        return response.status(200);
      })
      .catch((error) => {
        return response.status(error.statusCode).json(error);
      });
  },

  async sendEmailTemplateAws(request: Request, response: Response) {
    const { from, to, template, templateData } = request.body;
    let params = {
      Source: from,
      Destination: {
        ToAddresses: [to],
      },
      Template: template,
      // TemplateData: '{ \"name\':\'John Doe\'}'
      TemplateData: JSON.stringify(templateData),
    };

    AWS_SES.sendTemplatedEmail(params)
      .promise()
      .then(() => {
        return response.status(200);
      })
      .catch((error) => {
        return response.status(error.statusCode).json(error);
      });
  },
};
