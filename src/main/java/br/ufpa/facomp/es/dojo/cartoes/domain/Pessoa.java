package br.ufpa.facomp.es.dojo.cartoes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Pessoa.
 */
@Entity
@Table(name = "pessoa")
public class Pessoa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "email")
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "cadastro")
    private ZonedDateTime cadastro;

    @OneToMany(mappedBy = "pessoa")
    private Set<Cartao> cartaos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "pessoas", allowSetters = true)
    private Endereco endereco;

    @ManyToOne
    @JsonIgnoreProperties(value = "pessoas", allowSetters = true)
    private Categoria categoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Pessoa nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public Pessoa email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public Pessoa telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public Pessoa dataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public ZonedDateTime getCadastro() {
        return cadastro;
    }

    public Pessoa cadastro(ZonedDateTime cadastro) {
        this.cadastro = cadastro;
        return this;
    }

    public void setCadastro(ZonedDateTime cadastro) {
        this.cadastro = cadastro;
    }

    public Set<Cartao> getCartaos() {
        return cartaos;
    }

    public Pessoa cartaos(Set<Cartao> cartaos) {
        this.cartaos = cartaos;
        return this;
    }

    public Pessoa addCartao(Cartao cartao) {
        this.cartaos.add(cartao);
        cartao.setPessoa(this);
        return this;
    }

    public Pessoa removeCartao(Cartao cartao) {
        this.cartaos.remove(cartao);
        cartao.setPessoa(null);
        return this;
    }

    public void setCartaos(Set<Cartao> cartaos) {
        this.cartaos = cartaos;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public Pessoa endereco(Endereco endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public Pessoa categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pessoa)) {
            return false;
        }
        return id != null && id.equals(((Pessoa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pessoa{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", email='" + getEmail() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", cadastro='" + getCadastro() + "'" +
            "}";
    }
}
