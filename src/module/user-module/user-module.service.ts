import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ApiResponse, File } from "@src/_types/api-response.type";
import { UserModuleEntity } from "@src/module/user-module/user-module.entity";
import { userModuleModel } from "@src/module/user-module/user-module.model";
import { environment } from "@src/environment";
import * as nodemailer from 'nodemailer';
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { S3Provider } from "@src/providers/mongoose/s3.provider";
import { logger } from "io-logger";

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

    const key = environment.tokenSecret;

    const token = jwt.sign({ email: findUser.email }, key, {
      expiresIn: "24h"
    });

    console.log(environment.tokenSecret)

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

  async uploadAvatar(userId: string, file: File): Promise<ApiResponse> {
    const extension = file.originalname.split(".").pop();

    const command = new PutObjectCommand({
      Bucket: environment.bucketName,
      Key: `${uuidv4()}.${extension}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await new S3Provider().getS3().send(command);

      const imageUrl = `${environment.publicImageDevUrl}/${environment.bucketName}/${command.input.Key}`;

      logger.alert("new avatar uploaded");
    } catch (err) {
      logger.error(err as Error);
    }

    return { message: "Avatar enviado com sucesso!", errors: [] };
  }
}