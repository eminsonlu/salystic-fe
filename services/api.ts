export type ApiResponse<T> = [string | null, T | null];
export const handleApiResponse = <T>(
  promise: Promise<{ data: { data: T } }>
): Promise<ApiResponse<T>> => {
  return promise
    .then((res) => [null, res.data.data] as ApiResponse<T>)
    .catch((error) => [
      error?.response?.data?.error || 'An error occurred',
      null
    ] as ApiResponse<T>);
};

export const API_ERRORS = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
} as const;
