package com.editor.domain.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/5/3.
 */
@Entity
@Table(name = "element_data_vs_type", schema = "editor", catalog = "")
public class ElementDataVsType {
    private String id;
    private String elementTypeId;
    private String elementDataId;

    @Id
    @Column(name = "id")
    @GenericGenerator(name="generator",strategy = "uuid.hex")
    @GeneratedValue(generator = "generator")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "element_type_id")
    public String getElementTypeId() {
        return elementTypeId;
    }

    public void setElementTypeId(String elementTypeId) {
        this.elementTypeId = elementTypeId;
    }

    @Basic
    @Column(name = "element_data_id")
    public String getElementDataId() {
        return elementDataId;
    }

    public void setElementDataId(String elementDataId) {
        this.elementDataId = elementDataId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ElementDataVsType that = (ElementDataVsType) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (elementTypeId != null ? !elementTypeId.equals(that.elementTypeId) : that.elementTypeId != null)
            return false;
        if (elementDataId != null ? !elementDataId.equals(that.elementDataId) : that.elementDataId != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (elementTypeId != null ? elementTypeId.hashCode() : 0);
        result = 31 * result + (elementDataId != null ? elementDataId.hashCode() : 0);
        return result;
    }
}
