
import API from '../../service/api'

export async function fetchUsers(): Promise<any> {
    const response: any = await API.get('/?results=5');
    return response.data
}
