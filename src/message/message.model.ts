import { User } from "src/user/entities/user.entity";
import { CreateMessageDto } from "./dto/create-message.dto";

export class CreateMessagePayload extends CreateMessageDto {
    user: User
}