package com.editor.domain.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2017/5/3.
 */
@Entity
@Table(name = "element_type_dict", schema = "editor", catalog = "")
public class ElementTypeDict {
    private String id;
    private String elementTypeName;
    private String parentTypeId;
    private String memo;

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
    @Column(name = "element_type_name")
    public String getElementTypeName() {
        return elementTypeName;
    }

    public void setElementTypeName(String elementTypeName) {
        this.elementTypeName = elementTypeName;
    }

    @Basic
    @Column(name = "parent_type_id")
    public String getParentTypeId() {
        return parentTypeId;
    }

    public void setParentTypeId(String parentTypeId) {
        this.parentTypeId = parentTypeId;
    }

    @Basic
    @Column(name = "memo")
    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ElementTypeDict that = (ElementTypeDict) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (elementTypeName != null ? !elementTypeName.equals(that.elementTypeName) : that.elementTypeName != null)
            return false;
        if (parentTypeId != null ? !parentTypeId.equals(that.parentTypeId) : that.parentTypeId != null) return false;
        if (memo != null ? !memo.equals(that.memo) : that.memo != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (elementTypeName != null ? elementTypeName.hashCode() : 0);
        result = 31 * result + (parentTypeId != null ? parentTypeId.hashCode() : 0);
        result = 31 * result + (memo != null ? memo.hashCode() : 0);
        return result;
    }
}
