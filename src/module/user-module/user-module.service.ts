import { UserModuleEntity } from "@src/module/user-module/user-module.entity";
import { ApiResponse } from "@src/_types/api-response.type";
import { userModuleModel } from "@src/module/user-module/user-module.model";
import { environment } from "@src/environment";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as nodemailer from 'nodemailer';

export class UserModuleService {
  async create(data: UserModuleEntity): Promise<ApiResponse> {
    const findUser = await userModuleModel.findOne({
      email: data.email
    }).exec();

    if (findUser) {
      return { message: "error", errors: [{ key: "email", message: 'Já existe um usuário com esse email' }] };
    }

    const user = await userModuleModel.create({
      ...data,
      password: await bcrypt.hash(data.password, environment.bcryptSalt),
    });

    return { message: "User created successfully.", errors: [], data: user._id };
  }

  async login(data: { email: string; password: string }): Promise<ApiResponse> {
    const defErrorMessage = "Email ou senha errada!";

    const findUser = await userModuleModel.findOne({
      email: data.email,
      active: true
    }).exec();

    if (!findUser) {
      return { message: defErrorMessage, errors: [{ key: "email", message: defErrorMessage }] };
    }

    const compareToken = await bcrypt.compare(data.password, findUser.password);

    if (!compareToken) {
      return { message: defErrorMessage, errors: [{ key: "email", message: defErrorMessage }] };
    }

    const token = jwt.sign({ email: findUser.email }, environment.tokenSecret, {
      expiresIn: "18h"
    });

    return { message: "Login feito com sucesso!", errors: [], data: { token: token } }
  }

  async sendRecoverPasswordLink(data: { email: string }): Promise<ApiResponse> {
    const transporter = nodemailer.createTransport({
      host: environment.smtpHost,
      port: environment.smtpPort,
      secure: false,
      auth: {
        user: environment.smtpEmail,
        pass: environment.smtpPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const findUser = await userModuleModel.findOne({
      email: data.email,
      active: true
    }).exec();

    if (!findUser) {
      return { message: "Usuário não encontrado!", errors: [{ key: "email", message: "Usuário não encontrado!" }] };
    }

    const token = jwt.sign({ email: findUser.email }, environment.tokenSecret, {
      expiresIn: "5m"
    });

    await transporter.sendMail({
      to: data.email,
      from: environment.smtpEmail,
      subject: "Recuperação de senha",
      text: "Para recuperar sua senha, acesse o seguinte link: " + environment.frontEndUrl + `/auth/password-reset?token=${token}&email=${data.email}`,
    });

    return { message: "Email de recuperação enviado com sucesso!", errors: [] };
  }

  async resetPassword(data: { email: string; token: string; password: string }): Promise<ApiResponse> {
    const findUser = await userModuleModel.findOne({
      email: data.email,
      active: true
    }).exec();

    if (!findUser) {
      return { message: "Usuário não encontrado!", errors: [{ key: "email", message: "Usuário não encontrado!" }] };
    }

    try {
      jwt.verify(data.token, environment.tokenSecret);
    } catch (error) {
      return {
        message: "Token inválido ou expirado!",
        errors: [{ key: "token", message: "Token inválido ou expirado!" }]
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, environment.bcryptSalt);

    await userModuleModel.updateOne({ _id: findUser._id }, {
      $set: { password: hashedPassword },
    }).exec();

    return { message: "Senha atualizada com sucesso!", errors: [] }
  }
}