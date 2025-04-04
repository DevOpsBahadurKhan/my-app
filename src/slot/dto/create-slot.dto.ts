export class CreateSlotDto {
    doctorId: number;

    // Auto slot generation fields
    startTime?: Date;
    endTime?: Date;
    autoGenerate?: boolean; // if true → auto 15-min slots

    // Manual slot
    customSlots?: {
        startTime: Date;
        endTime: Date;
    }[];
}
