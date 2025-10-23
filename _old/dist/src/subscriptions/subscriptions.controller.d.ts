import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<import("./entities/subscription.entity").Subscription>;
    findAll(): Promise<import("./entities/subscription.entity").Subscription[]>;
    findOne(id: string): Promise<import("./entities/subscription.entity").Subscription | null>;
    update(id: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
