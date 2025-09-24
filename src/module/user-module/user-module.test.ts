import request from "supertest";
import { app, initialize } from "@src/main";
import mongoose from "mongoose";
import { environment } from "@src/environment";
import { userModuleModel } from "./user-module.model";

// Inicializa a aplicação e conecta ao banco antes de todos os testes
beforeAll(async () => {
	process.env.NODE_ENV = "test";
	await mongoose.connect(environment.mongoUri);
	await initialize(); // Inicializa o app Express
});

// Limpar a coleção de usuários e desconectar após todos os testes
afterAll(async () => {
	await userModuleModel.deleteMany({});
	await mongoose.connection.close();
});

describe("POST /api/user - User Creation Endpoint", () => {
	// Limpar usuários antes de cada teste para garantir isolamento
	beforeEach(async () => {
		await userModuleModel.deleteMany({});
	});

	// --- Testes de Caixa Preta ---

	test("should return 400 if password is too short (Boundary Value Analysis)", async () => {
		// Técnica: Análise de Valor Limite.
		// Objetivo: Testar o limite inferior inválido para o campo 'password'.
		// A regra de negócio exige no mínimo 6 caracteres. O teste usa 5.
		const response = await request(app)
			.post("/user")
			.set("x-api-key", environment.apiKey) // Adiciona a chave de API para passar pelo middleware
			.send({
				name: "Test User",
				email: "test.boundary@example.com",
				password: "12345", // < 6 caracteres
			});

		// A validação do Zod agora deve retornar 400
		expect(response.status).toBe(400);
		expect(response.body.errors[0].key[0]).toBe(
			"password"
		);
	});

	test("should create a user successfully with valid data (Equivalence Partitioning)", async () => {
		// Técnica: Particionamento em Classes de Equivalência.
		// Objetivo: Usar dados da classe de equivalência "válida" para todos os campos.
		const userData = {
			name: "Valid User",
			email: "valid.user@example.com",
			password: "password123",
		};

		const response = await request(app)
			.post("/api/user")
			.set("x-api-key", environment.apiKey) // Adiciona a chave de API para passar pelo middleware
			.send(userData);

		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();
		expect(response.body.message).toBe(
			"User created successfully."
		);
	});

	// --- Testes de Caixa Branca ---

	test("should return an error if email already exists (Logical Path Analysis)", async () => {
		// Técnica: Análise de Caminho Lógico.
		// Objetivo: Forçar a execução do caminho de código onde `if (findUser)` é verdadeiro.
		const existingUser = {
			name: "Existing User",
			email: "existing.user@example.com",
			password: "password123",
		};
		// 1. Criar um usuário diretamente no DB para o teste
		await userModuleModel.create(existingUser);

		// 2. Tentar criar o mesmo usuário novamente pela API
		const response = await request(app)
			.post("/api/user")
			.set("x-api-key", environment.apiKey) // Adiciona a chave de API para passar pelo middleware
			.send(existingUser);

		expect(response.status).toBe(200);
		expect(response.body.errors).toBeDefined();
		expect(response.body.errors[0].message).toBe(
			"Já existe um usuário com esse email"
		);
	});

	test("should correctly hash password and save user (Logical Path Analysis)", async () => {
		// Técnica: Análise de Caminho Lógico.
		// Objetivo: Percorrer o caminho de sucesso, garantindo que a condição `if (findUser)` seja falsa
		// e o usuário seja criado no banco de dados.
		const newUser = {
			name: "New User Path",
			email: "new.user.path@example.com",
			password: "aVerySecurePassword",
		};

		const response = await request(app)
			.post("/api/user")
			.set("x-api-key", environment.apiKey) // Adiciona a chave de API para passar pelo middleware
			.send(newUser);

		expect(response.status).toBe(200);
		expect(response.body.data).toBeDefined();

		// Verificar no banco se o usuário foi realmente criado
		const dbUser = await userModuleModel.findOne({
			email: newUser.email,
		});
		expect(dbUser).not.toBeNull();
		expect(dbUser?.name).toBe(newUser.name);
		// A senha no banco não deve ser igual à senha enviada (deve estar hasheada)
		expect(dbUser?.password).not.toBe(
			newUser.password
		);
	});
});
