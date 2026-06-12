// Form / input validation utilities.

export interface FieldResult {
  valid: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Korean / international phone: digits, optional + and separators, 7-20 chars.
const PHONE_RE = /^\+?[0-9][0-9\s().-]{6,19}$/;

export function validateName(name: string): FieldResult {
  if (!name || !name.trim()) return { valid: false, error: "이름을 입력해 주세요." };
  if (name.length > 100) return { valid: false, error: "이름은 100자 이하여야 합니다." };
  return { valid: true };
}

export function validatePhone(phone: string): FieldResult {
  if (!phone || !phone.trim())
    return { valid: false, error: "연락처를 입력해 주세요." };
  if (phone.length > 20)
    return { valid: false, error: "연락처는 20자 이하여야 합니다." };
  if (!PHONE_RE.test(phone.trim()))
    return { valid: false, error: "연락처 형식이 올바르지 않습니다." };
  return { valid: true };
}

// Email is OPTIONAL across WEFLOW forms — only validate when provided.
export function validateOptionalEmail(email?: string | null): FieldResult {
  if (!email || !email.trim()) return { valid: true };
  if (email.length > 254)
    return { valid: false, error: "이메일은 254자 이하여야 합니다." };
  if (!EMAIL_RE.test(email.trim()))
    return { valid: false, error: "이메일 형식이 올바르지 않습니다." };
  return { valid: true };
}

export function validateRequired(value: string, label: string): FieldResult {
  if (!value || !value.trim())
    return { valid: false, error: `${label}을(를) 입력해 주세요.` };
  return { valid: true };
}

export function validateMaxLength(
  value: string | null | undefined,
  max: number,
  label: string
): FieldResult {
  if (value && value.length > max)
    return { valid: false, error: `${label}은(는) ${max}자 이하여야 합니다.` };
  return { valid: true };
}

const VALID_SERVICE_TYPES = [
  "landing_page",
  "homepage",
  "landing_and_homepage",
  "other",
];
export function isValidServiceType(value: string): boolean {
  return VALID_SERVICE_TYPES.includes(value);
}

const VALID_STATUSES = ["pending", "in-progress", "completed"];
export function isValidStatus(value: string): boolean {
  return VALID_STATUSES.includes(value);
}

// Calendar: a date is bookable if today <= date <= today + 90 days.
export function isWithinBookingRange(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const max = new Date(today);
  max.setDate(max.getDate() + 90);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d >= today && d <= max;
}
