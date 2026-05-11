export function phoneToRuFormat(number?: string | null): string {
    if (!number) {
        return '';
    }

    const digits = number.replace(/\D/g, '');

    if (!digits) {
        return '';
    }

    let normalized = digits;

    if (normalized.startsWith('8')) {
        normalized = `7${normalized.slice(1)}`;
    } else if (normalized.startsWith('9')) {
        normalized = `7${normalized}`;
    } else if (!normalized.startsWith('7')) {
        normalized = `7${normalized}`;
    }

    normalized = normalized.slice(0, 11);

    const phone = normalized.slice(1);
    const part1 = phone.slice(0, 3);
    const part2 = phone.slice(3, 6);
    const part3 = phone.slice(6, 8);
    const part4 = phone.slice(8, 10);
    const formatedPhone = ['+7', part1, part2, part3, part4].filter(Boolean).join(' ');

    return formatedPhone;
}
