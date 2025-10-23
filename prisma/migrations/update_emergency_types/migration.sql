-- AlterEnum
-- Drop old enum values and add new ones
ALTER TYPE "EmergencyType" RENAME TO "EmergencyType_old";

CREATE TYPE "EmergencyType" AS ENUM ('ACCIDENT', 'FIRE', 'MEDICAL', 'FLOOD', 'QUAKE', 'ROBBERY', 'ASSAULT', 'OTHER');

-- Update existing data to map old values to new ones
ALTER TABLE "emergencies" ALTER COLUMN "type" TYPE "EmergencyType" USING (
  CASE "type"::text
    WHEN 'CRIME' THEN 'ROBBERY'::"EmergencyType"
    WHEN 'NATURAL_DISASTER' THEN 'FLOOD'::"EmergencyType"
    ELSE "type"::text::"EmergencyType"
  END
);

DROP TYPE "EmergencyType_old";
