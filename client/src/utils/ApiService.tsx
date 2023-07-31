class ApiService {
  static API_BASE_URL = process.env.REACT_APP_API_URL;

  static async get(path: string) {
    try {
      const response = await fetch(this.API_BASE_URL + path, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.message || 'An error occurred',
          data: null,
          status: response.status,
        };
      }
      return {
        success: true,
        message: 'Request successful',
        data: responseData,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
        status: 0,
      };
    }
  }

  static async post(path: string, data: any, isFile = false) {
    try {
      const response = await fetch(this.API_BASE_URL + path, {
        method: 'POST',
        headers: isFile ? {} : { 'Content-Type': 'application/json' },
        body: isFile ? data : JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: responseData.error || 'An error occurred',
          data: null,
          status: response.status,
        };
      }

      return {
        success: true,
        message: 'Request successful',
        data: responseData,
        status: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
        status: 0,
      };
    }
  }
}

export default ApiService;
