import React, { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import ContentHeader from '~/components/ContentHeader';
import RegisterButton from '~/components/RegisterButton';

import { EditButton, DelButton } from '~/pages/_layouts/default/styles';
import { ListContainer, TableList, Search } from './styles';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students', { params: { search } });

      setStudents(response.data);
    }

    loadStudents();
  }, [search]);

  function handleEditStudent(student) {
    history.push('/student/edit', { student });
  }

  async function confirmDelete(id) {
    const confirm = window.confirm('Deseja realmente deletar esse usuário?');

    if (confirm) {
      await api.delete(`/student/${id}`);

      const newList = students.filter(s => s.id !== id);
      setStudents(newList);

      toast.success('Usuário deletado com sucesso');
    }
  }

  return (
    <ListContainer>
      <ContentHeader>
        <h1>Gerenciando alunos</h1>
        <div>
          <RegisterButton to="/student/register" />
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
                <EditButton onClick={() => handleEditStudent(student)}>
                  editar
                </EditButton>
                <DelButton
                  type="button"
                  onClick={() => confirmDelete(student.id)}
                >
                  apagar
                </DelButton>
              </td>
            </tr>
          ))}
        </tbody>
      </TableList>
    </ListContainer>
  );
}
