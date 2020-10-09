package br.ufpa.facomp.es.dojo.cartoes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import br.ufpa.facomp.es.dojo.cartoes.domain.enumeration.StatusCartao;

/**
 * A Cartao.
 */
@Entity
@Table(name = "cartao")
public class Cartao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ndigitos")
    private String ndigitos;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusCartao status;

    @Column(name = "nometitular")
    private String nometitular;

    @Column(name = "codseguranca")
    private Integer codseguranca;

    @Column(name = "limitecredito")
    private Double limitecredito;

    @Column(name = "datavencimento")
    private LocalDate datavencimento;

    @OneToMany(mappedBy = "cartao")
    private Set<Fatura> faturas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "cartaos", allowSetters = true)
    private Pessoa pessoa;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNdigitos() {
        return ndigitos;
    }

    public Cartao ndigitos(String ndigitos) {
        this.ndigitos = ndigitos;
        return this;
    }

    public void setNdigitos(String ndigitos) {
        this.ndigitos = ndigitos;
    }

    public StatusCartao getStatus() {
        return status;
    }

    public Cartao status(StatusCartao status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusCartao status) {
        this.status = status;
    }

    public String getNometitular() {
        return nometitular;
    }

    public Cartao nometitular(String nometitular) {
        this.nometitular = nometitular;
        return this;
    }

    public void setNometitular(String nometitular) {
        this.nometitular = nometitular;
    }

    public Integer getCodseguranca() {
        return codseguranca;
    }

    public Cartao codseguranca(Integer codseguranca) {
        this.codseguranca = codseguranca;
        return this;
    }

    public void setCodseguranca(Integer codseguranca) {
        this.codseguranca = codseguranca;
    }

    public Double getLimitecredito() {
        return limitecredito;
    }

    public Cartao limitecredito(Double limitecredito) {
        this.limitecredito = limitecredito;
        return this;
    }

    public void setLimitecredito(Double limitecredito) {
        this.limitecredito = limitecredito;
    }

    public LocalDate getDatavencimento() {
        return datavencimento;
    }

    public Cartao datavencimento(LocalDate datavencimento) {
        this.datavencimento = datavencimento;
        return this;
    }

    public void setDatavencimento(LocalDate datavencimento) {
        this.datavencimento = datavencimento;
    }

    public Set<Fatura> getFaturas() {
        return faturas;
    }

    public Cartao faturas(Set<Fatura> faturas) {
        this.faturas = faturas;
        return this;
    }

    public Cartao addFatura(Fatura fatura) {
        this.faturas.add(fatura);
        fatura.setCartao(this);
        return this;
    }

    public Cartao removeFatura(Fatura fatura) {
        this.faturas.remove(fatura);
        fatura.setCartao(null);
        return this;
    }

    public void setFaturas(Set<Fatura> faturas) {
        this.faturas = faturas;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public Cartao pessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
        return this;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cartao)) {
            return false;
        }
        return id != null && id.equals(((Cartao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cartao{" +
            "id=" + getId() +
            ", ndigitos='" + getNdigitos() + "'" +
            ", status='" + getStatus() + "'" +
            ", nometitular='" + getNometitular() + "'" +
            ", codseguranca=" + getCodseguranca() +
            ", limitecredito=" + getLimitecredito() +
            ", datavencimento='" + getDatavencimento() + "'" +
            "}";
    }
}
