import React, { Component } from 'react'

export default props => {
    const renderRows = () => {
        const list = props.list || []
        return list.map(colab => (
            <tr key={colab._id}>
                <td>{colab.matricula}</td>
                <td>{colab.dataAdmin}</td>
                <td>{colab.detalhePessoa[0].nome}</td>
            </tr>
        ))
    }

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Data Admissão</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}
