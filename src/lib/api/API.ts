import axios from "axios";

export class API {
  constructor(private apiRoot: string) {}

  protected prepareHeaders(headers?: object) {
    return headers;
  }

  public async get<T>(url: string, headers?: object) {
    try {
      const res = await axios.get<T>(`${this.apiRoot}/${url}`, {
        headers: this.prepareHeaders(headers),
      });

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  public async post<T>(url: string, body?: unknown, headers?: object) {
    try {
      const res = await axios.post<T>(`${this.apiRoot}/${url}`, body, {
        headers: this.prepareHeaders(headers),
      });

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  public async put<T>(url: string, body?: unknown, headers?: object) {
    try {
      const res = await axios.put<T>(`${this.apiRoot}/${url}`, body, {
        headers: this.prepareHeaders(headers),
      });

      return res.data;
    } catch (e) {
      throw e;
    }
  }

  public async delete<T>(url: string, headers?: object) {
    try {
      const res = await axios.delete<T>(`${this.apiRoot}/${url}`, {
        headers: this.prepareHeaders(headers),
      });

      return res.data;
    } catch (e) {
      throw e;
    }
  }
}
