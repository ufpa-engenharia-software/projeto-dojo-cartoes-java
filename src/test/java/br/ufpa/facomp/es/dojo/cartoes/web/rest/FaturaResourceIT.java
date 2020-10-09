package br.ufpa.facomp.es.dojo.cartoes.web.rest;

import br.ufpa.facomp.es.dojo.cartoes.ProjetoDojoCartoesApp;
import br.ufpa.facomp.es.dojo.cartoes.domain.Fatura;
import br.ufpa.facomp.es.dojo.cartoes.repository.FaturaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.ufpa.facomp.es.dojo.cartoes.domain.enumeration.StatusFatura;
/**
 * Integration tests for the {@link FaturaResource} REST controller.
 */
@SpringBootTest(classes = ProjetoDojoCartoesApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FaturaResourceIT {

    private static final LocalDate DEFAULT_DATA_DE_PROCESSAMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_DE_PROCESSAMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_VALOR_TOTAL = 1D;
    private static final Double UPDATED_VALOR_TOTAL = 2D;

    private static final StatusFatura DEFAULT_STATUS = StatusFatura.GERADA;
    private static final StatusFatura UPDATED_STATUS = StatusFatura.ATRASADA;

    private static final String DEFAULT_PONTUACAO_GANHAR = "AAAAAAAAAA";
    private static final String UPDATED_PONTUACAO_GANHAR = "BBBBBBBBBB";

    @Autowired
    private FaturaRepository faturaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFaturaMockMvc;

    private Fatura fatura;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fatura createEntity(EntityManager em) {
        Fatura fatura = new Fatura()
            .dataDeProcessamento(DEFAULT_DATA_DE_PROCESSAMENTO)
            .valorTotal(DEFAULT_VALOR_TOTAL)
            .status(DEFAULT_STATUS)
            .pontuacaoGanhar(DEFAULT_PONTUACAO_GANHAR);
        return fatura;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fatura createUpdatedEntity(EntityManager em) {
        Fatura fatura = new Fatura()
            .dataDeProcessamento(UPDATED_DATA_DE_PROCESSAMENTO)
            .valorTotal(UPDATED_VALOR_TOTAL)
            .status(UPDATED_STATUS)
            .pontuacaoGanhar(UPDATED_PONTUACAO_GANHAR);
        return fatura;
    }

    @BeforeEach
    public void initTest() {
        fatura = createEntity(em);
    }

    @Test
    @Transactional
    public void createFatura() throws Exception {
        int databaseSizeBeforeCreate = faturaRepository.findAll().size();
        // Create the Fatura
        restFaturaMockMvc.perform(post("/api/faturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fatura)))
            .andExpect(status().isCreated());

        // Validate the Fatura in the database
        List<Fatura> faturaList = faturaRepository.findAll();
        assertThat(faturaList).hasSize(databaseSizeBeforeCreate + 1);
        Fatura testFatura = faturaList.get(faturaList.size() - 1);
        assertThat(testFatura.getDataDeProcessamento()).isEqualTo(DEFAULT_DATA_DE_PROCESSAMENTO);
        assertThat(testFatura.getValorTotal()).isEqualTo(DEFAULT_VALOR_TOTAL);
        assertThat(testFatura.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testFatura.getPontuacaoGanhar()).isEqualTo(DEFAULT_PONTUACAO_GANHAR);
    }

    @Test
    @Transactional
    public void createFaturaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = faturaRepository.findAll().size();

        // Create the Fatura with an existing ID
        fatura.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFaturaMockMvc.perform(post("/api/faturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fatura)))
            .andExpect(status().isBadRequest());

        // Validate the Fatura in the database
        List<Fatura> faturaList = faturaRepository.findAll();
        assertThat(faturaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFaturas() throws Exception {
        // Initialize the database
        faturaRepository.saveAndFlush(fatura);

        // Get all the faturaList
        restFaturaMockMvc.perform(get("/api/faturas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fatura.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataDeProcessamento").value(hasItem(DEFAULT_DATA_DE_PROCESSAMENTO.toString())))
            .andExpect(jsonPath("$.[*].valorTotal").value(hasItem(DEFAULT_VALOR_TOTAL.doubleValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].pontuacaoGanhar").value(hasItem(DEFAULT_PONTUACAO_GANHAR)));
    }
    
    @Test
    @Transactional
    public void getFatura() throws Exception {
        // Initialize the database
        faturaRepository.saveAndFlush(fatura);

        // Get the fatura
        restFaturaMockMvc.perform(get("/api/faturas/{id}", fatura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fatura.getId().intValue()))
            .andExpect(jsonPath("$.dataDeProcessamento").value(DEFAULT_DATA_DE_PROCESSAMENTO.toString()))
            .andExpect(jsonPath("$.valorTotal").value(DEFAULT_VALOR_TOTAL.doubleValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.pontuacaoGanhar").value(DEFAULT_PONTUACAO_GANHAR));
    }
    @Test
    @Transactional
    public void getNonExistingFatura() throws Exception {
        // Get the fatura
        restFaturaMockMvc.perform(get("/api/faturas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFatura() throws Exception {
        // Initialize the database
        faturaRepository.saveAndFlush(fatura);

        int databaseSizeBeforeUpdate = faturaRepository.findAll().size();

        // Update the fatura
        Fatura updatedFatura = faturaRepository.findById(fatura.getId()).get();
        // Disconnect from session so that the updates on updatedFatura are not directly saved in db
        em.detach(updatedFatura);
        updatedFatura
            .dataDeProcessamento(UPDATED_DATA_DE_PROCESSAMENTO)
            .valorTotal(UPDATED_VALOR_TOTAL)
            .status(UPDATED_STATUS)
            .pontuacaoGanhar(UPDATED_PONTUACAO_GANHAR);

        restFaturaMockMvc.perform(put("/api/faturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFatura)))
            .andExpect(status().isOk());

        // Validate the Fatura in the database
        List<Fatura> faturaList = faturaRepository.findAll();
        assertThat(faturaList).hasSize(databaseSizeBeforeUpdate);
        Fatura testFatura = faturaList.get(faturaList.size() - 1);
        assertThat(testFatura.getDataDeProcessamento()).isEqualTo(UPDATED_DATA_DE_PROCESSAMENTO);
        assertThat(testFatura.getValorTotal()).isEqualTo(UPDATED_VALOR_TOTAL);
        assertThat(testFatura.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testFatura.getPontuacaoGanhar()).isEqualTo(UPDATED_PONTUACAO_GANHAR);
    }

    @Test
    @Transactional
    public void updateNonExistingFatura() throws Exception {
        int databaseSizeBeforeUpdate = faturaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFaturaMockMvc.perform(put("/api/faturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fatura)))
            .andExpect(status().isBadRequest());

        // Validate the Fatura in the database
        List<Fatura> faturaList = faturaRepository.findAll();
        assertThat(faturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFatura() throws Exception {
        // Initialize the database
        faturaRepository.saveAndFlush(fatura);

        int databaseSizeBeforeDelete = faturaRepository.findAll().size();

        // Delete the fatura
        restFaturaMockMvc.perform(delete("/api/faturas/{id}", fatura.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fatura> faturaList = faturaRepository.findAll();
        assertThat(faturaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
