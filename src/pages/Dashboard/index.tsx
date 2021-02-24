import Box from '@material-ui/core/Box';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import ApiContext from '../../contexts/ApiContext';
import OrdemDeServico from '../../Types/OrdemDeServico';


const Dashboard: React.FC = () => {
  const { get } = useContext(ApiContext)
  const [estatisticas, setEstatisticas] = useState<any | undefined>(undefined);

  const listar = useCallback(async () => {
    const resposta = await get('oficina', true);
    if (resposta) {
      setEstatisticas(resposta);
    }

  }, [get]);

  useEffect(() => {
    listar()
  }, [listar])



  const datas: Date[] = estatisticas?.totalOrdensDeServico?.map((i: OrdemDeServico) => {
    const agoraMenosUmMes = new Date(i.dataDeRegistro);
    agoraMenosUmMes.setUTCHours(0);
    agoraMenosUmMes.setUTCMinutes(0);
    agoraMenosUmMes.setUTCSeconds(0);
    agoraMenosUmMes.setUTCMilliseconds(0);
    return agoraMenosUmMes;
  })

  let agrupamento: {
    data: Date,
    total: number,
  }[] = []


  datas?.forEach(data => {
    const index = agrupamento.findIndex(agr => agr.data.getTime() === data.getTime())
    if (index === -1) {
      agrupamento.push({
        data,
        total: 1,
      })
    }
    else {
      agrupamento[index] = { ...agrupamento[index], total: agrupamento[index].total + 1 }
    }
  })

  agrupamento = agrupamento.sort((agr, agr1) => {
    if (agr.data < agr1.data) {
      return -1
    }
    if (agr.data > agr1.data) {
      return 1
    }
    return 0
  })

  return 0 ? (
    <Box display="flex" justifyContent="center" alignItems="center" style={{ height: "100%" }}>
      <Chart
        chartType="Calendar"
        width="100%"
        height="80%"
        data={[
          [
            { type: 'date', label: 'Dias', },
            'Total'
          ],
          ...agrupamento.map(agr => [agr.data, agr.total])
        ]}
        options={{
          title: "Ordens de serviço",

          legend: {

          }
        }}

        chartLanguage="pt-BR"
        rootProps={{ 'data-testid': '1' }}
      />
    </Box>
  ) : <div />;
}

export default Dashboard;