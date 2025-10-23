export declare class CreateNotificationDto {
    id: string;
    title: string;
    message: string;
    type: string;
    target_district: string;
    recipients: string[];
    delivery_method: string[];
    status: string;
}
