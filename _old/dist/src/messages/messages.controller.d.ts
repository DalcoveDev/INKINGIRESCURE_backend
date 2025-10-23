import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto): Promise<import("./entities/message.entity").Message>;
    findAll(): Promise<import("./entities/message.entity").Message[]>;
    findOne(id: string): Promise<import("./entities/message.entity").Message | null>;
    update(id: string, updateMessageDto: UpdateMessageDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
