import { CreateChannelDto } from "./dto/create-channel.dto";

export class CreateChannelPayload extends CreateChannelDto{
    ownerId : string
}