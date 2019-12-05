import React, { useState, useEffect } from 'react';
import { MdSearch, MdEdit, MdDelete } from 'react-icons/md';
import api from '~/services/api';

import ContentHeader from '~/components/ContentHeader';
import RegisterButton from '~/components/RegisterButton';

import { EditButton, DelButton } from '~/pages/_layouts/default/styles';
import { ListContainer, TableList, Search } from './styles';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', { params: { search } });

      setStudents(response.data);
    }

    loadStudents();
  }, [search]);

  function confirmDelete() {
    window.confirm('Deseja realmente deletar esse usuário?');
  }

  // function handle() {
  //   console.tron.log('PASSOU');
  // }

  return (
    <ListContainer>
      <ContentHeader>
        <h1>Gerenciando alunos</h1>
        <div>
          <RegisterButton to="/student" />
          <Search>
            <MdSearch />
            <input
              type="text"
              placeholder="Buscar aluno"
              onChange={e => setSearch(e.target.value)}
            />
          </Search>
        </div>
      </ContentHeader>

      <TableList>
        <thead>
          <tr>
            <td>NOME</td>
            <td>EMAIL</td>
            <td>IDADE</td>
            <td />
          </tr>
        </thead>

        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.idade}</td>
              <td>
                <EditButton to={`/student/${student.id}`}>
                  <MdEdit size={30} />
                </EditButton>
                <DelButton type="button" onClick={confirmDelete}>
                  <MdDelete size={30} />
                </DelButton>
              </td>
            </tr>
          ))}
        </tbody>
      </TableList>
    </ListContainer>
  );
}
