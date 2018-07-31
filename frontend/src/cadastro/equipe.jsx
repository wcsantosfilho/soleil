import React, { Component } from 'react'
import axios from 'axios'
import consts from '../consts'

import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'

import List from './colabList'
const BASE_URL = consts.API_URL
class Equipe extends Component {
    constructor(props) {
        super(props)
        this.state = { list: [] }
        this.refresh()
    }

    refresh() {
        axios.post(`${BASE_URL}/colaborador/colaboradorGetSubordinados`, {gestorId: "5b2bf13c3cb23407f8c11356"})
            .then(resp => { 
                this.setState({...this.state, list: resp.data})
                console.log('Axios OK')
            })
            .catch((error) => {
                console.log('Erro no axios')
                console.log(error)
            })

    }

    render () {
        return (
            <div>
                <ContentHeader title='Equipe' small='do gestor José de Arimatéia' />
                <Content>
                    <List list={this.state.list} />
                </Content>
            </div>
        )
    }
}

export default Equipe