export function validateUUID(uuid: string): boolean {
  return /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[\da-f]{4}-[\da-f]{12}$/i.test(
    uuid,
  );
}
