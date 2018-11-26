import CONFIG from '../config'
import axios from 'axios'

const token = localStorage.getItem('accessToken')
const configHeader = {
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'x-access-token': token ? token : ''
	}
};

class ApiService {

	static login(email, senha) {
		return axios.post(`${CONFIG.API_URL_BASE}/usuario/login`, {
			email,
			senha,
		}, configHeader)
	}

	static registrarUsuario(nome, email, senha) {
		return axios.post(`${CONFIG.API_URL_BASE}/usuario/registrar`, {
			nome, 
			email, 
			senha
		}, configHeader)
	}

	static getSalas() {
		return axios.get(`${CONFIG.API_URL_BASE}/salas/`, configHeader)
	}

	static getSalasDisponiveis(data, horaInicial, horaFinal) {
		return axios.post(`${CONFIG.API_URL_BASE}/salas/disponiveis`, {
			data,
			horaInicial,
			horaFinal,
		}, configHeader)
	}

	static cadastrarAlterarSala(id, nome, descricao) {

		if (id) {
			return axios.put(`${CONFIG.API_URL_BASE}/salas/editar`, {
				id,
				nome,
				descricao,
			}, configHeader)
		}
		return axios.post(`${CONFIG.API_URL_BASE}/salas/cadastrar`, {
			nome,
			descricao
		}, configHeader)
	}

	static deletarSala(id) {
		return axios.delete(`${CONFIG.API_URL_BASE}/salas/deletar/${id}`, configHeader)
	}

	static cadastrarReserva(idSala, idUsuario, data, horaInicial, horaFinal, descricao) {
		return axios.post(`${CONFIG.API_URL_BASE}/reservas/cadastrar`, {
			idSala,
			idUsuario,
			data,
			horaInicial,
			horaFinal,
			descricao
		}, configHeader)
	}

	static getReservas() {
		return axios.get(`${CONFIG.API_URL_BASE}/reservas/`, configHeader)
	}
}

export default ApiService
