package br.ufpa.facomp.es.dojo.cartoes;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("br.ufpa.facomp.es.dojo.cartoes");

        noClasses()
            .that()
            .resideInAnyPackage("br.ufpa.facomp.es.dojo.cartoes.service..")
            .or()
            .resideInAnyPackage("br.ufpa.facomp.es.dojo.cartoes.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..br.ufpa.facomp.es.dojo.cartoes.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
