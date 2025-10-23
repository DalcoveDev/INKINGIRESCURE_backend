import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    create(createFeedbackDto: CreateFeedbackDto): Promise<import("./entities/feedback.entity").Feedback>;
    findAll(): Promise<import("./entities/feedback.entity").Feedback[]>;
    findOne(id: string): Promise<import("./entities/feedback.entity").Feedback | null>;
    update(id: string, updateFeedbackDto: UpdateFeedbackDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
