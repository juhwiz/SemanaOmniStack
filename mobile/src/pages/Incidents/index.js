import React, { useState, useEffect } from 'react'; //useEffect serve para quando vc quer que algo inicie assim que vc ligar a aplicação
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png'; //Importando a logo do cabeçalho

import style from './styles'; //Importando o styles 

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident }); //como segundo parametro, ele está enviando as informações para a proxima tela
    }

    async function loadIncidents(){
        if(loading){
            return;
        }
        if(total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        }); // pegando os incidents da api

        setIncidents([...incidents, ...response.data]); // colocando os incidents dentro do set incidents
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();   // função para carregar quando abrir a página
    },[]);

    return(
        <View style={style.container}>

            <View style={style.header}>
                <Image source={logoImg}/>
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={style.title}>Bem-vindo!</Text>
            <Text style={style.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList // Utilizado quando a vários intes de uma lista, então precisa dar scroll
                data={incidents} // Carregando os dados da lista que vem do banco de dados
                style={style.incidentList}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents}//carregando a lista no final 
                onEndReachedThreshold={0.3}//em quantos % a lista precisa estar para ela carregar mais
                showsVerticalScrollIndicator={false}
                renderItem={ ({ item: incident }) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>

                        <Text style={style.incidentProperty}>CASO:</Text>
                        <Text style={style.incidentValue}>{incident.title}</Text>

                        <Text style={style.incidentProperty}>VALOR:</Text>
                        <Text style={style.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                            </Text>

                        <TouchableOpacity 
                            style={style.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />                   
        </View>
    );
}