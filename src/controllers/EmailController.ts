import { Request, Response } from "express";

import { AWS_SES } from "../server";

export default {
  async sendEmailAws(request: Request, response: Response) {
    const { from, to, subject, body } = request.body;
    try {
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
            Data: subject,
          },
        },
      };
      AWS_SES.sendEmail(params)
        .promise()
        .then((res) => {
          return response.status(200).json({ message: "enviado com sucesso" });
        })
        .catch((error) => {
          return response
            .status(error.statusCode ? error.statusCode : 400)
            .json(error);
        });
    } catch (error) {
      return response.status(500).json({ message: "Erro interno" });
    }
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
