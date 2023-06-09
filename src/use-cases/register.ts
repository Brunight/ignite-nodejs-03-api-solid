import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface RegisterUseCaseRequest {
	name: string
	email: string
	password: string
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ email, name, password }: RegisterUseCaseRequest) {
		const password_hash = await hash(password, 6)

		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			// return reply.status(409).send()
			throw new UserAlreadyExistsError()
		}

		await this.usersRepository.create({
			email,
			name,
			password_hash,
		})
	}
}
