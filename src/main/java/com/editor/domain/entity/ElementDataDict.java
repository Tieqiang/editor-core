package com.editor.domain.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/5/3.
 */
@Entity
@Table(name = "element_data_dict", schema = "editor", catalog = "")
public class ElementDataDict {
    private String id;
    private String elementName;
    private String viewType;
    private String standCode;
    private String dataRelamId;

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
    @Column(name = "element_name")
    public String getElementName() {
        return elementName;
    }

    public void setElementName(String elementName) {
        this.elementName = elementName;
    }

    @Basic
    @Column(name = "view_type")
    public String getViewType() {
        return viewType;
    }

    public void setViewType(String viewType) {
        this.viewType = viewType;
    }

    @Basic
    @Column(name = "stand_code")
    public String getStandCode() {
        return standCode;
    }

    public void setStandCode(String standCode) {
        this.standCode = standCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ElementDataDict that = (ElementDataDict) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (elementName != null ? !elementName.equals(that.elementName) : that.elementName != null) return false;
        if (viewType != null ? !viewType.equals(that.viewType) : that.viewType != null) return false;
        if (standCode != null ? !standCode.equals(that.standCode) : that.standCode != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (elementName != null ? elementName.hashCode() : 0);
        result = 31 * result + (viewType != null ? viewType.hashCode() : 0);
        result = 31 * result + (standCode != null ? standCode.hashCode() : 0);
        return result;
    }

    @Basic
    @Column(name = "data_relam_id")
    public String getDataRelamId() {
        return dataRelamId;
    }

    public void setDataRelamId(String dataRelamId) {
        this.dataRelamId = dataRelamId;
    }
}
