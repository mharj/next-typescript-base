export function getBaseUrl(): string {
	return process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api' : 'https://some_production_url/api';
}
